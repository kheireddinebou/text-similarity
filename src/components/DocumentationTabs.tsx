"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import { FC } from "react";
import Code from "@/ui/Code";
import SimpleBar from "simplebar-react";
import { nodejsCode, pythonCode } from "@/helpers/documentation-code";

const DocumentationTabs: FC = ({}) => (
  <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
    <TabsList>
      <TabsTrigger value="nodejs">NodeJs</TabsTrigger>
      <TabsTrigger value="python">Python</TabsTrigger>
    </TabsList>
    <TabsContent value="nodejs">
      <SimpleBar>
        <Code language="javascript" code={nodejsCode} show animated />
      </SimpleBar>
    </TabsContent>

    <TabsContent value="python">
      <SimpleBar>
        <Code language="python" code={pythonCode} show animated />
      </SimpleBar>
    </TabsContent>
  </Tabs>
);

export default DocumentationTabs;
