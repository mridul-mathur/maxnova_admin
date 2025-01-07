import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCompany, getAllCompany } from "src/redux/actions/companyAction";
import {
  addNewCategory,
  getAllCategory,
} from "src/redux/actions/categoryAction";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import CustomeModel from "../model/model";
import UserTableRow from "../user-table-row";
import UserTableHead from "../user-table-head";
import UserTableToolbar from "../user-table-toolbar";

// ----------------------------------------------------------------------

const initialData = { name: "", description: "", image: null };

export default function UserPage() {
  const dispatch = useDispatch();

  const allCompany = useSelector((state) => state.company.allcompany);
  const allCategory = useSelector((state) => state.category.allcategory);

  const [companyData, setCompanyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [newCompany, setNewCompany] = useState(initialData);
  const [newCategory, setNewCategory] = useState(initialData);

  const [openCompany, setOpenCompany] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    dispatch(getAllCompany());
    dispatch(getAllCategory());
  }, []);

  useEffect(() => {
    if (allCompany) setCompanyData(allCompany);
  }, [allCompany]);

  useEffect(() => {
    if (allCategory) setCategoryData(allCategory);
  }, [allCategory]);

  const handleFileChange = (event, isCompany = true) => {
    const file = event.target.files[0];
    if (file) {
      const setter = isCompany ? setNewCompany : setNewCategory;
      setter((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddCompany = () => {
    const formData = new FormData();
    formData.append("name", newCompany.name);
    formData.append("description", newCompany.description);
    formData.append("image", newCompany.image);
    dispatch(addNewCompany(formData));
    setOpenCompany(false);
    setNewCompany(initialData);
  };

  const handleAddCategory = () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    formData.append("image", newCategory.image);
    dispatch(addNewCategory(formData));
    setOpenCategory(false);
    setNewCategory(initialData);
  };

  return (
    <>
      {/* Company Section */}
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Company</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenCompany(true)}
          >
            New Company
          </Button>
        </Stack>
        <CustomeModel
          open={openCompany}
          addImage
          data={newCompany}
          label={{ name: "Company Name", description: "Company Description" }}
          handleClose={() => setOpenCompany(false)}
          handleData={(e) =>
            setNewCompany({ ...newCompany, [e.target.name]: e.target.value })
          }
          handleImage={(e) => handleFileChange(e, true)}
          handleAdd={handleAddCompany}
        />
        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserTableHead headLabel={[{ id: "name", label: "Name" }]} />
                <TableBody>
                  {companyData.map((row) => (
                    <UserTableRow key={row._id} {...row} isCompany />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

      {/* Category Section */}
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Category</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenCategory(true)}
          >
            New Category
          </Button>
        </Stack>
        <CustomeModel
          open={openCategory}
          addImage
          data={newCategory}
          label={{ name: "Category Name", description: "Category Description" }}
          handleClose={() => setOpenCategory(false)}
          handleData={(e) =>
            setNewCategory({ ...newCategory, [e.target.name]: e.target.value })
          }
          handleImage={(e) => handleFileChange(e, false)}
          handleAdd={handleAddCategory}
        />
        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <UserTableHead headLabel={[{ id: "name", label: "Name" }]} />
                <TableBody>
                  {categoryData.map((row) => (
                    <UserTableRow key={row._id} {...row} isCompany={false} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
