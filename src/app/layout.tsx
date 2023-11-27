import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const bodyStyle = {
    margin: 0,
  };

  return (
    <html lang="en">
      <body style={bodyStyle}>{children}</body>
    </html>
  );
};

export default RootLayout;
