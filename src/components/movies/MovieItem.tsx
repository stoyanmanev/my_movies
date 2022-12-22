import { Image } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";

type Props = {
  id: string,
  name: string;
  imagePath: string;
};

const MovieItem = (props: Props) => {
  return (
    <Link to={`/movies/${props.id}`}>
      <Card
        bordered={false}
        style={{ marginBottom: 26 }}
        cover={
          <Image
            preview={false}
            style={{ height: 260, objectFit: "cover", objectPosition: "top" }}
            src={props.imagePath}
          />
        }
      >
        <Meta title={props.name} />
      </Card>
    </Link>
  );
};

export default MovieItem;
