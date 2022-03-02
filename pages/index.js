/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import AddGiveaway from "../components/AddGiveaway";
import Giveaways from "../components/Giveaways";
import NewGiveaway from "../components/NewGiveaway";
import Search from "../components/Search.js";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/clientApp";

export const getStaticProps = async (context) => {
  const colRef = collection(db, "giveaways");

  let data = [];
  let noPurchase = [];
  await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      const newDoc = {
        ...doc.data(),
        ref: doc.id,
      };
      if (newDoc.number === "Customer claimed 'No Purchase Necessary'") {
        noPurchase.push(newDoc);
      }

      data.push(newDoc);
    });
  });

  return {
    props: {
      data,
      noPurchase,
    },
  };
};

export default function Home({ data, noPurchase }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [giveaways, setGiveaways] = useState(data);
  const [displayedGiveaways, setDisplayedGiveaways] = useState(giveaways);
  const [open, setOpen] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [noPurchaseNeeded, setNoPurchaseNeeded] = useState(false);
  const [formError, setFormError] = useState(false);
  const [noPurchaseArr, setNoPurchaseArr] = useState(noPurchase);
  const colRef = collection(db, "giveaways");

  useEffect(() => {
    setDisplayedGiveaways(
      giveaways.filter((giveaway) => giveaway.number.includes(searchQuery))
    );
  }, [searchQuery]);

  useEffect(() => {
    setDisplayedGiveaways(giveaways);
    let newNoPurchase = [];
    giveaways.forEach((giveaway) => {
      if (giveaway.number === "Customer claimed 'No Purchase Necessary'") {
        newNoPurchase.push(giveaway);
      }
    });
    setNoPurchaseArr(newNoPurchase);
  }, [giveaways]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getCurrentTime = () => {
    const time = new Date();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    const day = time.getDate();
    const clockTime = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const timeString = `${month}/${day}/${year} - ${clockTime}`;

    return timeString;
  };

  const addNewGiveaway = async () => {
    if (!noPurchaseNeeded && !receiptNumber) {
      setFormError(true);
    } else {
      if (formError) setFormError(false);
      let newGiveaway;
      if (noPurchaseNeeded) {
        newGiveaway = {
          number: "Customer claimed 'No Purchase Necessary'",
          registeredTime: getCurrentTime(),
          id: uuidv4(),
        };
      } else {
        newGiveaway = {
          number: receiptNumber,
          registeredTime: getCurrentTime(),
          id: uuidv4(),
        };
      }
      await addDoc(colRef, newGiveaway);
      await getDocs(colRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const docData = doc.data();
          if (docData.id === newGiveaway.id) {
            const newDoc = {
              ...doc.data(),
              ref: doc.id,
            };
            setGiveaways((prevState) => [...prevState, newDoc]);
          } else {
            return;
          }
        });
      });

      if (receiptNumber) {
        setReceiptNumber("");
      }
      if (noPurchaseNeeded) {
        setNoPurchaseNeeded(false);
      }
      setSearchQuery("");
      setDisplayedGiveaways(giveaways);
      setOpen(false);
    }
  };

  const handleDeleteGiveaway = async (id) => {
    const docRef = doc(db, "giveaways", id);
    await deleteDoc(docRef);
    const data = await getDocs(colRef).then((snapshot) => {
      const newDocs = snapshot.docs.map((doc) => {
        const newDoc = {
          ref: doc.id,
          ...doc.data(),
        };
        return newDoc;
      });
      return newDocs;
    });
    setGiveaways(data);
  };

  return (
    <div>
      <h1 className="text-center text-2xl md:text-4xl font-bold mb-12">
        Daytona Bike Week Giveaway Entry
      </h1>
      <Search query={searchQuery} handleSearch={handleSearch} />
      <div className="max-w-sm mx-auto mt-12">
        {giveaways && (
          <h2 className="uppercase text-gray-100 text-lg flex items-center justify-between">
            Total # of Giveaways:{" "}
            <span className="bg-gold-100 text-gold-700 font-bold p-2 rounded ml-2 text-xl">
              {giveaways.length}
            </span>
          </h2>
        )}
        {giveaways && (
          <h2 className="uppercase text-gray-100 text-sm mt-8 flex items-center justify-between">
            Total # of Purchase Claimed:{" "}
            <span className="bg-green-100 text-green-600 font-bold p-2 rounded ml-2 text-xl">
              {giveaways.length - noPurchaseArr.length}
            </span>
          </h2>
        )}
        {noPurchaseArr && (
          <h2 className="uppercase text-gray-100 text-sm mt-8 flex items-center justify-between">
            Total # of No Purchase Claimed:{" "}
            <span className="bg-rose-100 text-rose-600 font-bold p-2 rounded ml-2 text-lg">
              {noPurchaseArr.length}
            </span>
          </h2>
        )}
      </div>
      <div>
        {displayedGiveaways.length > 0 ? (
          <Giveaways
            giveaways={displayedGiveaways}
            handleDeleteGiveaway={handleDeleteGiveaway}
            setOpen={setOpen}
          />
        ) : (
          <NewGiveaway setOpen={setOpen} />
        )}
        <AddGiveaway
          open={open}
          setOpen={setOpen}
          receiptNumber={receiptNumber}
          setReceiptNumber={setReceiptNumber}
          noPurchaseNeeded={noPurchaseNeeded}
          setNoPurchaseNeeded={setNoPurchaseNeeded}
          addNewGiveaway={addNewGiveaway}
          formError={formError}
        />
      </div>
    </div>
  );
}
