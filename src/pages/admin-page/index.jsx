import React from "react";

function index() {
  return <div>index</div>
}

export default index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const currentPath = req ? req.url : window.location.pathname;

  if (
    (!user && user?.email !== "asomanirawlingsjunior5333@gmail.com") ||
    (!user && user?.email !== "kwabenasakyi450@gmail.com")
  )
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
