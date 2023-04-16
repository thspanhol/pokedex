function Card({name, sprite, types}) {
  return (
      <div>
        <img alt={name} src={sprite}/>
        <h2>{name}</h2>
        {types.map((e) => <h3>{e.type.name}</h3>)}
      </div>
  );
}

export default Card;
