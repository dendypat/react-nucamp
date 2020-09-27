import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

function RenderCard(item) {
  console.log(item)
  return (
    <Card>
      <CardImg src={item.item.image} alt={item.item.name} />
      <CardBody>
        <CardTitle>{item.item.name}</CardTitle>
        <CardText>{item.item.description}</CardText>
      </CardBody>
    </Card>
  )
}

function Home(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard item={props.campsite} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.promotion} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.partner} />
        </div>
      </div>
    </div>
  );
}

export default Home;
