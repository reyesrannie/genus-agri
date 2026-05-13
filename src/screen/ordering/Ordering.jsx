import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

import MobileLoading from "../../components/custom/MobileLoading";
import NoDataFound from "../../components/custom/NoDataFound";
import TableGrid from "../../components/custom/TableGrid";
import BreadCrumbs from "../../components/custom/BreadCrumbs";

import "../../components/styles/MasterList.scss";
import { useOrderQuery } from "../../services/server/api/orderingAPI";
import AppSearch from "../../components/custom/AppSearch";
import useParamsHookTransaction from "../../services/hooks/useParamsHookTransaction";
import OrderStatusChanger from "../../components/custom/OrderStatusChanger";
import {
  setCreateOrdering,
  setOrdering,
  setPrintableModal,
  setUpdateOrdering,
  setViewOrdering,
} from "../../services/server/slice/modalSlice";
import OrderingModal from "../../components/modal/OrderingModal";
import CustomPagination from "../../components/custom/CustomPagination";
import MenuPopper from "../../components/custom/MenuPopper";
import {
  resetPrompt,
  setArchive,
  setViewRemarks,
} from "../../services/server/slice/promptSlice";
import AppPrompt from "../../components/custom/AppPrompt";

import warning from "../../assets/svg/warning.svg";
import CreateOrderPrompt from "../../components/custom/CreateOrderPrompt";
import TransactionPrint from "../../components/custom/TransactionPrint";

const Ordering = () => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const viewRemarks = useSelector((state) => state.prompt.viewRemarks);
  const ordering = useSelector((state) => state.modal.ordering);

  const {
    params,
    onStatusChange,
    onPageChange,
    onSelectPage,
    onRowChange,
    onSearchData,
    onSortTable,
  } = useParamsHookTransaction();

  const { data, isLoading, isFetching, isError, isSuccess } =
    useOrderQuery(params);

  const header = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "reject", label: "Reject" },
    { value: "return", label: "Returned" },
  ];

  const tableHeader = [
    {
      name: "Mir",
      value: "id",
      sort: true,
    },
    {
      name: "Requestor",
      value: "requestor",
      child: "name",
      type: "parent",
    },
    {
      name: "Customer",
      value: "customer",
      child: "name",
      type: "parent",
    },
    {
      name: "Charge to",
      value: "charging",
      child: "name",
      type: "parent",
    },
    {
      name: "Status",
      type: "status",
      value: "status",
    },
    {
      name: "Date needed",
      value: "date_needed",
      type: "date",
    },
    {
      name: "Date modified",
      value: "updated_at",
      type: "date",
    },
  ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      mx={2}
      my={2}
      px={1}
      py={1}
      borderRadius={3}
    >
      <BreadCrumbs />

      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={2}
      >
        <Typography
          color="text.primary"
          sx={{
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Ordering
        </Typography>
        {params?.status === "pending" && (
          <Button
            sx={{ textTransform: "capitalize" }}
            size="small"
            color="info"
            variant="contained"
            startIcon={<LibraryAddOutlinedIcon />}
            onClick={(e) => {
              dispatch(setCreateOrdering(true));
            }}
          >
            New
          </Button>
        )}
      </Stack>

      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={2}
      >
        <OrderStatusChanger
          params={params}
          onStatusChange={onStatusChange}
          header={header}
        />
        <AppSearch onSearch={onSearchData} />
      </Stack>

      {isFetching ? (
        <MobileLoading />
      ) : isError ? (
        <NoDataFound />
      ) : (
        <TableGrid
          header={tableHeader}
          items={data?.result}
          params={params}
          onSort={onSortTable}
          {...(params?.status === "pending"
            ? {
                onSelect: (e, i) => {
                  dispatch(setOrdering(i));

                  if (i?.status?.toLowerCase() === "return") {
                    dispatch(setViewRemarks(true));
                  } else {
                    setAnchorEl({
                      mouseX: e.clientX,
                      mouseY: e.clientY,
                    });
                  }
                },
              }
            : {
                onSelect: (e, i) => {
                  dispatch(setOrdering(i));
                  dispatch(setPrintableModal(true));
                },
              })}
        />
      )}

      {isSuccess && (
        <CustomPagination
          data={data?.result}
          onPageChange={onPageChange}
          onRowChange={onRowChange}
          onChange={onSelectPage}
        />
      )}

      <MenuPopper
        params={params}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        update={() => {
          setAnchorEl(null);
          dispatch(setUpdateOrdering(true));
        }}
        {...(params.status === "pending" && {
          archive: () => {
            setAnchorEl(null);
            dispatch(setArchive(true));
          },
        })}
      />

      <OrderingModal />
      <TransactionPrint />

      <AppPrompt
        open={viewRemarks}
        image={warning}
        title={`Information`}
        message={ordering?.reason}
        confirmButton={`Confirm, update it!`}
        cancelButton={`${params?.status === "active" ? "No, Keep it!" : "Cancel"} `}
        confirmOnClick={() => {
          dispatch(resetPrompt());
          dispatch(setUpdateOrdering(true));
        }}
      />
    </Box>
  );
};

export default Ordering;
