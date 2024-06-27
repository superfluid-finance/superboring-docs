import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  useEffect(() => {
    history.push("/docs");
  }, [history]);

  return null; // No need to render anything as the page will redirect immediately
}
