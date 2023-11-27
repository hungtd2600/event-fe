/* eslint-disable @next/next/no-img-element */
"use client";
import { ReactElement, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StyledParams } from "@/type/common";
import axiosInstance from "@/utils/axios";
import { Box, Button, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import { Permission } from "@/component/module/Permission";
import { Layout } from "@/component/module/Layout";
import dayjs from "dayjs";

type Event = {
  _id: string;
  name: string;
  date: Date;
  description: string;
  imageUrl: string;
  location: string;
};

/**
 * HomePage component page.
 * @return {JSX.Element} HomePage component.
 */
const HomePage = (): ReactElement => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getEvents = async (page?: number) => {
    const res = await axiosInstance("/events", { params: { page: page } });
    setPageCount(res.data.last_page);
    setEvents(res.data.data);
  };

  const handleChangePage = (_: any, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getEvents(currentPage);
  }, [currentPage]);

  return (
    <Permission>
      <Layout />
      <HomeWrapper>
        <Typography gutterBottom variant="h2">
          Home
        </Typography>
        <Button onClick={() => getEvents(currentPage)}>Get Event</Button>
        {events.map((event: Event) => {
          return (
            <EventWrapper key={event._id}>
              <Typography
                color={"primary"}
                width={"fit-content"}
                margin={"auto"}
                fontSize={24}
                paddingBottom={1}
              >
                {event?.name}
              </Typography>
              <ImageStyled alt="event" src={event.imageUrl} />
              {event?.date && (
                <Typography>
                  Ngày: {dayjs(event.date).format("DD-MM-YYYY")}
                </Typography>
              )}
              {event.location && (
                <Typography>Địa điểm: {event.location}</Typography>
              )}
            </EventWrapper>
          );
        })}
        <Box pt={2}>
          {pageCount ? (
            <Pagination
              onChange={handleChangePage}
              count={pageCount}
              color="primary"
            />
          ) : (
            <></>
          )}
        </Box>
      </HomeWrapper>
    </Permission>
  );
};

const HomeWrapper = styled(Stack)(({ theme }: StyledParams) => ({
  padding: theme.spacing(2),
  alignItems: "center",
}));

const EventWrapper = styled(Box)(({ theme }: StyledParams) => ({
  margin: theme.spacing(2, 0),
}));

const ImageStyled = styled("img")(({ theme }: StyledParams) => ({
  width: "100%",
  borderRadius: 20,
  border: "1px solid #ccc",
}));

export default HomePage;
