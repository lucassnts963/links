import { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";

import { database as db } from "../../services/firebase";

export function useLinks(user) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (user) {
      const urlRef = ref(db, "users/" + user.uid + "/urls");
      onValue(urlRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          setLinks(Object.entries(data));
        } else {
          setLinks([]);
        }
      });
    }
  }, [user]);

  return links;
}
