import React from "react";
import withSession from "../api/session";
import Layout from "../../pages/admin-page/layout";
import MyProduct from "./my-product";

function index({ user }) {
  console.log(user);
  return (
    <>
      <Layout user={user} />
      <div>
        <MyProduct />
      </div>
    </>
  );
}

export default index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const currentPath = req ? req.url : window.location.pathname;

  if (
    (!user && user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) ||
    (!user && user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL2)
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }

  return {
    props: {
      user: user ? user : null
    }
  };
});
