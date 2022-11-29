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
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-y-8 xs:gap-x-2 sm:gap-x-4 mb-4">
              {cardData.map((card) => (
                <div key={card.id}>
                  {card
                    .data()
                    .serverName.toLowerCase()
                    .includes(`${searchQuery.toLowerCase()}`) && (
                    <Card
                      serverName={card.data().serverName}
                      avatarImage={card.data().avatarImage}
                      bannerImage={card.data().bannerImage}
                      description={card.data().description}
                      id={card.id}
                      isShow={searchQuery}
                    />
                  )}
                </div>
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
