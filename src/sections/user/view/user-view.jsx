import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import { users } from "src/_mock/user";
import { addNewCompany, getAllCompany } from "src/redux/actions/companyAction";
import {
  addNewCategory,
  getAllCategory,
} from "src/redux/actions/categoryAction";

import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";

import CustomeModel from "../model/model";
import UserTableHead from "../user-table-head";
import UserTableRowCompany from "../company-row";
import UserTableRowCategory from "../category-row";
import UserTableToolbar from "../user-table-toolbar";

// ----------------------------------------------------------------------

const initialCompanyData = {
  name: "",
  description: "",
  image: null,
  catalog: null,
};

const initialCategoryData = {
  name: "",
  description: "",
  image: null,
};

export default function ComapanyCategoryPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();
  const allcompany = useSelector((state) => state.company.allcompany);
  const allcategory = useSelector((state) => state.category.allcategory);

  const [companyData, setCompanyData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  const [newCompany, setNewCompany] = useState(initialCompanyData);
  const [newCategory, setNewCategory] = useState(initialCategoryData);

  useEffect(() => {
    dispatch(getAllCompany());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (allcompany) {
      setCompanyData(allcompany);
    }
  }, [allcompany]);

  useEffect(() => {
    if (allcategory) {
      setCategoryData(allcategory);
    }
  }, [allcategory]);

  const handleChangeCompany = (event) => {
    const { name, value } = event.target;
    setNewCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeCategory = (event) => {
    const { name, value } = event.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openCompany, setOpenCompany] = useState(false);

  const [openCategory, setOpenCategory] = useState(false);

  const handleOpen = (name) => {
    if (name === "company") {
      setOpenCompany(true);
    } else {
      setOpenCategory(true);
    }
  };

  const handleClose = (name) => {
    if (name === "company") {
      setOpenCompany(false);
      setNewCompany(initialCompanyData);
    } else {
      setOpenCategory(false);
      setNewCategory(initialCategoryData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleImageChangeCompany = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCompany((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleCatelogChangeCompany = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCompany((prev) => ({
        ...prev,
        catalog: file,
      }));
    }
  };

  const handleImageChangeCategory = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewCategory((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleAddCompany = () => {
    const data = new FormData();
    data.append("name", newCompany.name);
    data.append("description", newCompany.description);
    data.append("image", newCompany.image);
    data.append("catalog", newCompany.catalog);
    dispatch(addNewCompany(data));
    handleClose("company");
  };

  const handleAddCategory = () => {
    const data = new FormData();
    data.append("name", newCategory.name);
    data.append("description", newCategory.description);
    data.append("image", newCategory.image);
    dispatch(addNewCategory(data));
    handleClose("category");
  };

  return (
    <>
      {/* Company Section */}
      <Container sx={{ pb: 10 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Company</Typography>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleOpen("company")}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Company
          </Button>
        </Stack>
        <CustomeModel
          open={openCompany}
          data={newCompany}
          label={{ name: "Company Name", description: "Company Description" }}
          handleClose={() => handleClose("company")}
          handleData={handleChangeCompany}
          handleImage={handleImageChangeCompany}
          handleCatelog={handleCatelogChangeCompany}
          handleAdd={handleAddCompany}
          isChange={false}
        />
        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "description", label: "Description" },
                  ]}
                />
                {companyData && (
                  <TableBody>
                    {companyData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <UserTableRowCompany
                          key={row._id}
                          id={row._id}
                          name={row.name}
                          description={row.description}
                          image={row.image}
                          isCompany
                        />
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          {companyData && (
            <TablePagination
              page={page}
              component="div"
              count={companyData.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
      <Container sx={{ pb: 10 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Category</Typography>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleOpen("category")}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Category
          </Button>
        </Stack>
        <CustomeModel
          addCatalog={false}
          open={openCategory}
          addImage
          data={newCategory}
          label={{ name: "Category Name", description: "Category Description" }}
          handleClose={() => handleClose("category")}
          handleData={handleChangeCategory}
          handleImage={handleImageChangeCategory}
          handleAdd={handleAddCategory}
          isChange={false}
        />
        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  headLabel={[
                    { id: "name", label: "Name" },
                    { id: "description", label: "Description" },
                  ]}
                />
                {categoryData && (
                  <TableBody>
                    {categoryData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <UserTableRowCategory
                          key={row._id}
                          id={row._id}
                          name={row.name}
                          description={row.description}
                          image={row.image}
                          isCategory
                        />
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          {categoryData && (
            <TablePagination
              page={page}
              component="div"
              count={categoryData.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
    </>
  );
}
