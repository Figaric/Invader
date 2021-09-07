import { useEffect, useState } from "react";
import Loading from "../components/shared/Loading";

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  });

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <p>
        Here is

        some text for you
      </p>
    </div>
  )
}

export default Index;
