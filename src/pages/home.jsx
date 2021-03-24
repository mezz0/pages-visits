import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet';
import InputFile from 'ds-react-input-file';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
function Home() {
  // const [pageVisits, setPageVisits] = useState(null);
  // const [uniqueVisits, setUniqueVisits] = useState(null);
  const [fileData, setFileData] = useState(null);

  // const dataSortedByPath = dataMapped.sort((a, b) => (a.url > b.url ? 1 : b.url > a.url ? -1 : 0));
  // const uniqueUrl = [...new Set(dataSortedByPath.map((item) => item.url))];
  // const testuniqueVisits = [...new Set(dataSortedByPath.map((item) => item.id))];
  // console.log(uniqueUrl, testuniqueVisits);

  const getDemUniques = (array) => {
    const a = [];
    const b = [];
    let prev = [];

    array.sort();
    for (let i = 0; i < array.length; i++) {
      if (array[i].url !== prev.url) {
        a.push(array[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = array[i];
    }

    return [a, b];
  };

  const resolveData = (data) => {
    const dataSplit = data.split('\n');
    const dataMapped = dataSplit.map((path) => ({
      url: path.split(' ')[0],
      id: path.split(' ')[1],
    }));

    const dataSortedByPath = dataMapped.sort((a, b) => (a.url > b.url ? 1 : b.url > a.url ? -1 : 0));
    const result = getDemUniques(dataSortedByPath);
    const pathsWithVisits = result[0]
      .map((path, index) => ({
        url: path.url,
        visits: result[1][index],
      }))
      .sort((a, b) => (a.visits > b.visits ? 1 : b.visits > a.visits ? -1 : 0));
    setFileData(pathsWithVisits);
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div>
        <p>Hi, please upload something and check the dev console</p>
      </div>
      <div>
        <InputFile onComplete={(data) => resolveData(data)} />
      </div>
      <div>
        {fileData &&
          fileData.map((path) => !!path.url && <p key={path.url}>{`Path: ${path.url} .... Visits: ${path.visits}`}</p>)}
      </div>
    </Wrapper>
  );
}

export default withRouter(Home);
