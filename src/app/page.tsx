"use client";
import { ReactElement, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StyledParams } from "@/type/common";
import axiosInstance from "@/utils/axios";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Permission } from "@/component/module/Permission";

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
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const res = await axiosInstance("/events");
    setEvents(res.data.data);
  };

  return (
    <Permission>
      <HomeWrapper>
        <Typography gutterBottom variant="h2">
          Home
        </Typography>
        <Button onClick={() => getEvents()}>Get Event</Button>
        {events.map((event: Event) => {
          return (
            <Box key={event._id}>
              <Typography>{event?.name}</Typography>
            </Box>
          );
        })}
      </HomeWrapper>
    </Permission>
  );
};

const HomeWrapper = styled(Stack)(({ theme }: StyledParams) => ({
  padding: theme.spacing(4),
  alignItems: "center",
}));

export default HomePage;
