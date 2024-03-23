"use client";
import {
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";

interface CodeLogViewerProps {
  toggleAIDiffEditor: () => void;
}

export default function CodeLogViewer(props: CodeLogViewerProps) {
  const { toggleAIDiffEditor } = props;
  return (
    <div className="flex w-full flex-col">
      <Button onClick={toggleAIDiffEditor}>Toggle AIDiffEditor</Button>
      <Tabs aria-label="Options">
        <Tab key="logs" title="Logs">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="ai" title="AI 추천코드">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
