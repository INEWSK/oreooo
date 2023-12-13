// "use client";

import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

export default function Index() {
  const t = useTranslations("Index");
  // const [oreoList, setOreoList] = useState<OreoKey[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  // const handleSubmit = (newList: OreoKey[]) => {};

  return (
    <>
      <Loading />
      <Footer />
    </>
  );
  // return <h1>{t("title")}</h1>;
}
