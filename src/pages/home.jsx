import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';
import * as vars from '../styles/exports';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  max-width: ${vars.sizes.maxWidth};
  margin: auto;

  .buttonBlock {
    display: flex;
    justify-content: center;
  }

  button {
    margin: 10px;
    padding: 5px 15px;
    border-radius: 10px;
    transition: all 0.5s ease;
    background-color: #ffffff;
    cursor: pointer;

    &:hover {
      background-color: #ebebeb;
    }
  }
`;

const CustomTable = styled.div`
  #headerBlock,
  #infoBlock {
    display: flex;
    justify-content: center;

    h2,
    p {
      padding: 10px;
      width: 100%;
      text-align: center;
    }

    h2 {
      position: relative;

      &.visits {
        &:after {
          content: '';
          position: absolute;
          border-width: ${(props) => (props.direction === 'asc' ? '3px 0px 0px 3px' : '0px 3px 3px 0px')};
          border-style: solid;
          border-color: black;
          width: 10px;
          height: 10px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          right: 70px;
          transition: all 0.3s ease;
        }
      }
    }
  }

  #infoBlock {
    display: block;
    &:nth-child(odd) {
      background-color: #ebebeb;
    }
    span {
      display: flex;
    }
  }
`;

function Home() {
  const [fileData, setFileData] = useState(null);
  const [sortedDAta, setSortedData] = useState(fileData);
  const [currentOrderBy, setCurrentOrderBy] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  const sortByVisits = (direction) => {
    const data = fileData;

    if (direction === 'asc') {
      data.sort((a, b) => (a.visits < b.visits ? -1 : 0));
      setCurrentOrderBy('Least to Most');
    }
    if (direction === 'desc') {
      data.sort((a, b) => (a.visits > b.visits ? -1 : 0));
      setCurrentOrderBy('Most to Least');
    }

    setSortDirection(direction);
    setSortedData(data);
  };

  const resolveData = (data) => {
    const dataSplit = data.split('\n');
    const dataMapped = dataSplit
      .map((path) => ({
        url: path.split(' ')[0],
        id: path.split(' ')[1],
      }))
      .filter((x) => x.id !== undefined);
    const uniqueUrl = [...new Set(dataMapped.map((item) => item.url))];

    const dataInfo = uniqueUrl.map((path) => ({
      url: dataMapped.find((x) => x.url === path).url,
      visits: dataMapped.filter((x) => x.url === path).length,
      ips: dataMapped.filter((x) => x.url === path),
      uniqueIps: [...new Set(dataMapped.filter((x) => x.url === path).map((x) => x.id))],
    }));

    setFileData(dataInfo);
  };

  const sortByVisitsUnique = () => {
    const data = fileData.sort((a, b) => (a.uniqueIps < b.uniqueIps ? 1 : 0));
    setCurrentOrderBy('Unique visits > Most to Least');
    setSortedData(data);
    setSortDirection('desc');
  };

  const handleUpload = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const decodedData = atob(data.replace('data:application/octet-stream;base64,', ''));
      resolveData(decodedData);
    };
    reader.readAsDataURL(input.files[0]);
  }

  return (
    <Wrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="buttonBlock">
        <input data-testid="fileUpload" id='fileUpload' type='file' accept='.log' onChange={(e) => handleUpload(e)} />
      </div>
      {fileData && (
        <div className="buttonBlock">
          <button onClick={() => sortByVisits('desc', fileData)}>Order by most to least visits</button>
          <button onClick={() => sortByVisits('asc', fileData)}>Order by least to most visits</button>
          <button onClick={() => sortByVisitsUnique(fileData)}>Order by Unique least to most visits</button>
        </div>
      )}
      {sortedDAta && (
        <CustomTable direction={sortDirection}>
          <div id="headerBlock">
            <h2>Path</h2>
            <h2 className="visits">{`${currentOrderBy.includes('Unique') ? 'Unique' : ''} Visits`}</h2>
          </div>
          <div id="infoBlock">
            {sortedDAta.map((path, i) => (
              <span key={`${path.url}-${i}`}>
                <p>{path.url}</p>
                <p>{currentOrderBy.includes('Unique') ? path.uniqueIps.length : path.visits}</p>
              </span>
            ))}
          </div>
        </CustomTable>
      )}
    </Wrapper>
  );
}

export default withRouter(Home);
