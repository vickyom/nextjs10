import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Navbar = () => {
  const useStyles = makeStyles({
    text: {
      fontWeight: 500,
      fontSize: 16,
    },
  });
  const classes = useStyles();
  return (
    <nav>
      <div className="logo">
        <Image src="/logo.png" alt="site logo" width={128} height={77} />
      </div>
      <AppBar className={classes.text}>
        <Toolbar>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/movies/">
            <a>Movies</a>
          </Link>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
