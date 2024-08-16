import { Helmet } from "react-helmet-async";

import EditContent from "src/sections/editcontent/view/editcontent";

// ----------------------------------------------------------------------

export default function EditContentPage() {
  return (
    <>
      <Helmet>
        <title> Edit Content | Minimal UI </title>
      </Helmet>
      <EditContent />
    </>
  );
}
