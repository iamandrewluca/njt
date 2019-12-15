import React, { useState, useCallback } from "react";
import styled from "styled-components";
import InputForm from "../components/InputForm";
import Example from "../components/Example";
import AvailableDestinations from "../components/AvailableDestinations";
import Signature from "../components/Signature";
import PageMetadata from "../components/PageMetadata";

const H2 = styled.h2`
  margin-top: 3em;
  font-size: 1em;
`;

const ExamplePackages = styled.div``;

const ExamplePackage = styled.div<{ clickable: boolean }>`
  display: inline-block;
  margin-right: 0.5em;
  cursor: default;
  ${(p) =>
    p.clickable
      ? `
    border-bottom: 1px dotted #24292e66;
    cursor: pointer;
  `
      : ""};
`;

const remarkByDestination = {
  "": "no specified destination",
  h: "homepage",
  s: "source",
  r: "releases",
  y: "yarn",
};

const exampleUrlByPackageAndDestination = {
  prettier: {
    "": "https://www.npmjs.com/package/prettier",
    h: "https://prettier.io",
    s: "https://github.com/prettier/prettier",
    r: "https://github.com/prettier/prettier/releases",
    y: "https://yarnpkg.com/package/prettier",
  },
  react: {
    "": "https://www.npmjs.com/package/react",
    h: "https://reactjs.org",
    s: "https://github.com/facebook/react/tree/master/packages/react",
    r: "https://github.com/facebook/react/releases",
    y: "https://yarnpkg.com/package/react",
  },
  lodash: {
    "": "https://www.npmjs.com/package/lodash",
    h: "https://lodash.com",
    s: "https://github.com/lodash/lodash",
    r: "https://github.com/lodash/lodash/releases",
    y: "https://yarnpkg.com/package/lodash",
  },
  typescript: {
    "": "https://www.npmjs.com/package/typescript",
    h: "https://www.typescriptlang.org",
    s: "https://github.com/Microsoft/TypeScript",
    r: "https://github.com/Microsoft/TypeScript/releases",
    y: "https://yarnpkg.com/package/typescript",
  },
};

const IndexPage = () => {
  const [examplePackage, setExamplePackage] = useState(
    () => Object.keys(exampleUrlByPackageAndDestination)[0],
  );
  const handleExamplePackageClick = useCallback(
    (e) => {
      setExamplePackage(e.currentTarget.innerText);
    },
    [setExamplePackage],
  );

  const [inputText, setInputText] = useState("");

  const handleExampleClick = useCallback(
    (text) => {
      setInputText(" ");
      setTimeout(() => setInputText(text), 0);
    },
    [setInputText],
  );

  const handleSelectedDestinationChange = useCallback(
    (destination) => {
      setInputText((currentInputText) => {
        const currentPackage = currentInputText.trim().split(" ", 1)[0];
        return `${currentPackage || examplePackage} ${destination}`;
      });
    },
    [setInputText, examplePackage],
  );

  return (
    <>
      <PageMetadata />

      <InputForm text={inputText} onTextChange={setInputText} />

      <H2>Available destinations</H2>
      <AvailableDestinations
        selectedDestination={inputText.trim().split(" ", 2)[1]}
        onSelectedDestinationChange={handleSelectedDestinationChange}
      />

      <H2>Examples</H2>
      <ExamplePackages>
        {Object.keys(exampleUrlByPackageAndDestination).map(
          (currentExamplePackage) => (
            <ExamplePackage
              key={currentExamplePackage}
              clickable={currentExamplePackage !== examplePackage}
              onClick={handleExamplePackageClick}
            >
              {currentExamplePackage}
            </ExamplePackage>
          ),
        )}
      </ExamplePackages>
      {Object.entries(remarkByDestination).map(([destination, remark]) => {
        return (
          <Example
            key={destination}
            to={`${examplePackage} ${destination}`.trim()}
            remark={remark}
            url={exampleUrlByPackageAndDestination[examplePackage][destination]}
            onToClick={handleExampleClick}
          />
        );
      })}

      <Signature />
    </>
  );
};

export default IndexPage;
