import { CardContent, Card, Typography } from "@mui/material";

interface Props {
  title: string;
  number: string;
  subtitle: string;
  icon?: any;
  percent?: any;
}

export const CardComponent = ({
  title,
  number,
  subtitle,
  icon,
  percent,
}: Props) => {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {number}
        </Typography>
        {/* <img src={icon} alt="icon"></img> */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};
