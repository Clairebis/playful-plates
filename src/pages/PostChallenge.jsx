/*------------Natalia ----------*/
import Header from "../components/Header/Header";
import PhotoUpload from "../components/PostChallenge/PhotoUpload";
import TitleUpload from "../components/PostChallenge/TitleUpload";
import DescriptionUpload from "../components/PostChallenge/DescriptionUpload";
import LabelChoice from "../components/PostChallenge/LabelChoice";
import TypeOfPost from "../components/PostChallenge/TypeOfPost";

export default function PostChallenge() {
  return (
    <>
      <Header pageTitle="Mystery Box" />
      <PhotoUpload />
      <TitleUpload />
      <DescriptionUpload />
      <LabelChoice />
      <TypeOfPost />
    </>
  );
}
