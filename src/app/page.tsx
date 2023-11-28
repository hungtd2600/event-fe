/* eslint-disable @next/next/no-img-element */
"use client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { StyledParams } from "@/type/common";
import axiosInstance from "@/utils/axios";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { Permission } from "@/component/module/Permission";
import { Layout } from "@/component/module/Layout";
import { Event, EventProps } from "@/component/page/home/Event";

/**
 * HomePage component page.
 * @return {JSX.Element} HomePage component.
 */
const HomePage = (): ReactElement => {
  const [events, setEvents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getEvents = useCallback(
    async (page?: number) => {
      try {
        const res = await axiosInstance("/events", { params: { page: page } });
        setPageCount(res.data.last_page);
        setEvents(res.data.data);
      } catch (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage]
  );

  const handleChangePage = (_: any, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getEvents(currentPage);
  }, [currentPage, getEvents]);

  return (
    <Permission>
      <Layout />
      <HomeWrapper>
        <Typography gutterBottom variant="h2">
          Home
        </Typography>
        <Button onClick={() => getEvents(currentPage)}>Get Event</Button>
        {events.map((event: EventProps, index: number) => {
          return (
            <Event
              key={index}
              name={event.name}
              date={event.date}
              imageUrl={event.imageUrl}
              location={event.location}
            />
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

export default HomePage;
