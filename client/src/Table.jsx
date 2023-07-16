import React from "react";
import styled from "styled-components";

function Table({ headings, data }) {
  console.log(data);
  const list = (
    <>
      {data.map((item) => (
        <TableRow key={item.id}>
          {Object.entries(item).map(([key, value]) => (
            <TableData key={key}>{value}</TableData>
          ))}
        </TableRow>
      ))}
    </>
  );

  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          {headings.map((item) => (
            <TableHeading key={item}>{item}</TableHeading>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {list}
      </TableBody>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const TableHead = styled.div`
  background-color: #4070f4;
  width: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const TableHeading = styled.div`
  padding: 10px 15px;
  color: #fff;
  font-weight: bold;
`;

const TableBody = styled.div`
  width: 100%;
  height: 455px;
  overflow: auto;
  & > div:nth-child(even) {
    background-color: #f3f3f3;
  }
`;

const TableData = styled.div`
  padding: 10px 15px;
`;

export default Table;
