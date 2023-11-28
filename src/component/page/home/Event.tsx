import React, { ReactElement } from "react";
import { StyledParams } from "@/type/common";
import { Box, Typography, styled } from "@mui/material";
import dayjs from "dayjs";

export type EventProps = {
  name: string;
  date?: Date;
  imageUrl?: string;
  location?: string;
};

/**
 * Event component page.
 * @return {JSX.Element} Event component.
 */
export const Event: React.FC<EventProps> = ({
  date,
  imageUrl,
  location,
  name,
}): ReactElement => {
  return (
    <EventWrapper>
      <Typography
        textTransform={"capitalize"}
        color={"primary"}
        width={"fit-content"}
        margin={"auto"}
        fontSize={24}
        paddingBottom={1}
      >
        {name}
      </Typography>
      <ImageStyled alt="event" src={imageUrl} />
      {date && (
        <Typography>Ngày: {dayjs(date).format("DD-MM-YYYY")}</Typography>
      )}
      {location && <Typography>Địa điểm: {location}</Typography>}
    </EventWrapper>
  );
};

const EventWrapper = styled(Box)(({ theme }: StyledParams) => ({
  margin: theme.spacing(2, 0),
}));

const ImageStyled = styled("img")(({ theme }: StyledParams) => ({
  width: "100%",
  borderRadius: 20,
  border: "1px solid #ccc",
}));
