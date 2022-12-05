import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { firestore } from "../firebase/firebase";
import Card from "./Card";
import Spinner from "./Spinner";

type FeaturedProps = {
  searchQuery: string;
};

const Featured: React.FC<FeaturedProps> = ({ searchQuery }) => {
  const [cardData, setCardData] = useState<any[]>([]);
  const [dataLoading, setIsdataLoading] = useState(true);
  const [newQuery, setNewQuery] = useState<any[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(firestore, "discord"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setCardData(snapshot.docs);
        }
      ),
    [firestore]
  );

  useEffect(() => {
    if (cardData) {
      setTimeout(() => {
        setIsdataLoading(false);
      }, 2000);
    }
  }, [cardData]);

  const filterSearchParams = () => {
    cardData.map((searchData) => {
      if (
        searchData
          .data()
          .serverName.toLowerCase()
          .includes(`${searchQuery.toLowerCase()}`)
      ) {
        newQuery.length = 0;
        newQuery.push({
          ...newQuery,
          serverName: searchData.data().serverName,
          avatarImage: searchData.data().avatarImage,
          bannerImage: searchData.data().bannerImage,
          description: searchData.data().description,
          id: searchData.id,
        });
      } else return;
    });
  };

  useEffect(() => {
    filterSearchParams();
  }, [searchQuery, cardData]);

  console.log(newQuery);

  return (
    <div className="pt-6">
      <div className="text-white pb-4">
        <p className="font-bold text-[20px]">Featured Servers</p>
        <p className="text-white/50">
          {`Some awesome Discords we think you'd love`}
        </p>
      </div>

      {searchQuery ? (
        <>
          {/* Cards*/}
          {dataLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-y-8 xs:gap-x-2 sm:gap-x-4 mb-4">
              {newQuery.map((data) => (
                <Card
                  serverName={data.serverName}
                  avatarImage={data.avatarImage}
                  bannerImage={data.bannerImage}
                  description={data.description}
                  id={data.id}
                  key={data.id}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Cards*/}
          {dataLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-y-8 xs:gap-x-2 sm:gap-x-4 mb-4">
              {cardData.map((card) => (
                <Card
                  serverName={card.data().serverName}
                  avatarImage={card.data().avatarImage}
                  bannerImage={card.data().bannerImage}
                  description={card.data().description}
                  id={card.id}
                  key={card.id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Featured;
