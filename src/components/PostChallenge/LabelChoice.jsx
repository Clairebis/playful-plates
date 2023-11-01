import PostLabel from "./PostLabel";

export default function LabelChoice() {
  return (
    <>
      <div className="chooseALabelRow">
        Preparation:
        <PostLabel label="Quick" />
        <PostLabel label="Complex" />
      </div>

      <div className="chooseALabelRow">
        Diet:
        <PostLabel label="Meat" />
        <PostLabel label="Fish" />
        <PostLabel label="Vegetarian" />
        <PostLabel label="Vegan" />
        <PostLabel label="Gluten-free" />
        <PostLabel label="Lactose-free" />
      </div>
      <div className="chooseALabelRow">
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
