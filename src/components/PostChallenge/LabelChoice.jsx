import PostLabel from "./PostLabel";

export default function LabelChoice() {
  return (
    <>
      <div className="chooseLabelRow">
        Preparation:
        <PostLabel label="Quick" />
        <PostLabel label="Complex" />
      </div>

      <div className="chooseLabelRow">
        Diet:
        <PostLabel label="Meat" />
        <PostLabel label="Fish" />
        <PostLabel label="Vegetarian" />
        <PostLabel label="Vegan" />
        <PostLabel label="Gluten-free" />
        <PostLabel label="Lactose-free" />
      </div>
      <div className="chooseLabelRow">
        Type:
        <PostLabel label="Breakfast" />
        <PostLabel label="Lunch" />
        <PostLabel label="Main" />
        <PostLabel label="Dessert" />
        <PostLabel label="Snack" />
        <PostLabel label="Soup" />
      </div>
    </>
  );
}
