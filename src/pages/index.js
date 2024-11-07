import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import HomePage from "./home";
import withSession from "./api/session";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Home({ user }) {

  console.log(user)
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Welcome To Darlington&apos;s Mall</title>
        <meta name="description" content="Welcome To Darlington's Mall" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage user={user} />

      <div className={styles.container}>
        {user && (user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL2)&& (
          <div className={styles.addContainer}>
            <AdminPanelSettingsIcon className={styles.icon} onClick={() => router.push("/admin-page")} />
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const currentPath = req ? req.url : window.location.pathname;

  if (user) {
    req.session.set("user", user);
    await req.session.save();
  }

  return {
    props: {
      user: user ? user : null,
    },
  };
});
