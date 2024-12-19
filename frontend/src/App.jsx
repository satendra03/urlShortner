import "./App.css";
import Main from "./components/customs/Main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "./components/mode-toggle";
import Work from "./components/customs/Work";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="relative">
      <div className="content">
        <h1 className="scroll-m-20 my-5 md:my-10 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
          Short N Share
        </h1>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Welcome
        </h3>
        <blockquote className="mt-3 border-l-2 border-r-2 px-6 italic">
          Shorten your URLs with ease and share them anywhere—quick, simple, and
          memorable
        </blockquote>
        <h5></h5>
      </div>
      <div className="tabs flex items-center justify-center p-3 my-3">
        <Tabs defaultValue="shortURL" className="">
          <TabsList>
            <TabsTrigger value="shortURL">Short URL</TabsTrigger>
            <TabsTrigger value="analyze">Analyze</TabsTrigger>
          </TabsList>
          <TabsContent value="shortURL">
            <Main />
          </TabsContent>
          <TabsContent value="analyze">
            <Work />
          </TabsContent>
        </Tabs>
      </div>
      <div className="mode w-full flex justify-center items-center">
        <ModeToggle />
      </div>
      <div className="credits text-sm text-muted-foreground w-full flex flex-col justify-center items-center">
        <p className="text-center mt-5">
          Made with ❤️ by{" "}
          <Link
            to="https://www.instagram.com/_satendra_03/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            <span className="font-mono"> (@_satendra_03)</span>
          </Link>
        </p>
        <p className="text-center">
          Copyright © 2023 Satendra Kumar Parteti. <br /> All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
