import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F8F6F1] ">
      <Navbar />
      {/**<div>
        <img src="https://evernote.com/_next/image?url=%2Fimages%2Fsplit%2Fsketches.webp&w=1920&q=75"></img>
      </div> */}
      {/** ONE OF THE DIV  */}
      <div className="text-center my-20 mx-96">
        <div className="font-serif text-7xl">
          What will you <br />
          <span className="text-[#04A72E]">achieve </span> today?
        </div>
        <h1 className="text-xl my-5 mx-10">
          Remember everything and tackle any project with your notes, tasks, and
          schedule all in one place.
        </h1>
        <button className="bg-[#04A72E] px-20 py-5 rounded-md my-5 border-[1px] border-black text-white">
          <Link to="/signup">
            <h1 className="text-2xl font-bold">Get Task Manager free</h1>
          </Link>
        </button>
        <div className="my-5 underline text-xl">
          Already have an account?
          <Link to="/login">
            <h1 className="text-2xl font-bold">Log in</h1>
          </Link>
        </div>
      </div>
      {/** ONE OF THE DIV */}
      <div className="flex flex-row my-0 mx-60">
        <div className=" mx-5">
          <img
            src="https://evernote.com/_next/image?url=%2Fimages%2Ficons%2Flocation.webp&w=128&q=75"
            className="my-3"
          ></img>
          <h1 className="text-3xl font-serif font-lg my-3">Work anywhere</h1>
          <h2 className="text-md my-3">
            Keep important info handy—your notes sync automatically to all your
            devices.
          </h2>
        </div>
        <div>
          <img
            src="https://evernote.com/_next/image?url=%2Fimages%2Ficons%2Fpin.webp&w=128&q=75"
            className="my-3"
          ></img>
          <h1 className="text-3xl font-serif font-lg my-3">
            Remember everything
          </h1>
          <h2 className="text-md my-3">
            Make notes more useful by adding text, images, audio, scans, PDFs,
            and documents.
          </h2>
        </div>
        <div>
          <img
            src="https://evernote.com/_next/image?url=%2Fimages%2Ficons%2Fcheck.webp&w=128&q=75"
            className="my-3"
          ></img>
          <h1 className="text-3xl font-serif font-lg my-3">
            Turn to-do into done
          </h1>
          <h2 className="text-md my-3">
            Bring your notes, tasks, and schedules together to get things done
            more easily.
          </h2>
        </div>
        <div>
          <img
            src="https://evernote.com/_next/image?url=%2Fimages%2Ficons%2Fsearch.webp&w=128&q=75"
            className="my-3"
          ></img>
          <h1 className="text-3xl font-serif font-lg my-3">Find things fast</h1>
          <h2 className="text-md my-3">
            Get what you need, when you need it with powerful and flexible
            search capabilities.
          </h2>
        </div>
      </div>
      {/** ONE OF THE  DIV */}
      <div className="mx-52">
        <div className="flex flex-row my-20 ">
          <div className="w-2/5  mx-10">
            <h1 className="font-serif text-5xl font-md my-3">
              Your information, your way
            </h1>
            <h2 className="text-xl my-3">
              Use task manager to capture more than just words. Harness the
              power of the internet with Web Clipper. Scan and store your
              important files, documents, and images. Remind yourself how
              awesome you are with audio notes. No matter if it’s meeting notes,
              receipts, manuals, or family recipes, Task Manager keeps them
              secure.
            </h2>
          </div>
          <div className="w-3/5">
            <img src="https://evernote.com/_next/image?url=%2Fimages%2Fsplit%2Fsketches.webp&w=1920&q=75"></img>
          </div>
        </div>
        <div className="flex flex-row  my-20 ">
          <div className="w-3/5">
            <img src="https://evernote.com/_next/image?url=%2Fimages%2Fsplit%2Fno-signal.webp&w=1920&q=75"></img>
          </div>
          <div className="w-2/5  mx-10">
            <h1 className="font-serif text-5xl font-md my-3">24/7 access</h1>
            <h2 className="text-xl my-3">
              Task Manager automatically syncs across all your devices so you
              can access your most important information anytime, anywhere. No
              WiFi? No problem—offline mode means you can continue to use Task
              Manager even when the internet cuts out.
            </h2>
            <button>Get Task Manager free</button>
          </div>
        </div>
        <div className="flex flex-row my-20 ">
          <div className="w-2/5  mx-10">
            <h1 className="font-serif text-5xl font-md my-3">Instant recall</h1>
            <h2 className="text-xl my-3">
              Intuitive Task Manager search features like AI-Powered Search help
              you get the right information from your notes quickly and
              reliably. And our advanced search options aren’t limited to notes:
              with Task Manager, you can search your PDFs, documents, and images
              with ease.
            </h2>
          </div>
          <div className="w-3/5">
            <img src="https://evernote.com/_next/image?url=%2Fimages%2Fsplit%2Feasy-search.webp&w=1920&q=75"></img>
          </div>
        </div>
        <div className="flex flex-row my-20 ">
          <div className="w-3/5">
            <img src="https://evernote.com/_next/image?url=%2Fimages%2Fsplit%2Fteamwork.webp&w=1920&q=75"></img>
          </div>
          <div className="w-2/5  mx-10">
            <h1 className="font-serif text-5xl font-md my-3">
              Effortless collaboration
            </h1>
            <h2 className="text-xl my-3">
              Task Manager makes it easy to collaborate on projects. Real-Time
              Editing immediately syncs changes to keep all contributors up to
              date. The Tasks feature helps you outline the next steps and
              assign responsibilities. And with unlimited sharing permissions,
              everyone is the loop and on the same page.
            </h2>
          </div>
        </div>
      </div>
      {/** ONE OF THE DIV */}
      <div className="bg-[#005D13] px-96 mt-20 text-center py-40 ">
        <div className="text-white text-7xl font-serif my-10">
          Tame your work <br /> organize your work
        </div>
        <h1 className="text-white text-xl px-8">
          Remember anything and tackle any project with your notes, tasks, and
          schedule all in one place.
        </h1>
        <button className="bg-white py-5  px-16 text-xl rounded-md my-5">
          <Link to="/signup"> Get Task Manager free</Link>
        </button>
      </div>
      {/** FOOTER OF THE LANDING PAGE */}
      <div className="flex flex-row justify-between mx-20 py-10">
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
        <div className="flex flex-row">
          <FaFacebook className="text-2xl mx-2" />
          <FaTwitter className="text-2xl mx-2" />
          <FaMedium className="text-2xl mx-2" />
          <FaInstagram className="text-2xl mx-2" />
          <FaYoutube className="text-2xl mx-2" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

{
  /***/
}
