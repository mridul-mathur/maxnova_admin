import CompanyTable from "src/sections/user/view/companyTable";
import CategoryTable from "src/sections/user/view/categoryTable";
import SubproductTable from "src/sections/user/view/subproductTable";
import SubcategoryTable from "src/sections/user/view/subcategoryTable";

// ----------------------------------------------------------------------

export default function ComapanyCategoryPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
      <CompanyTable />
      <CategoryTable />
      <SubcategoryTable />
      <SubproductTable />
    </div>
  );
}
