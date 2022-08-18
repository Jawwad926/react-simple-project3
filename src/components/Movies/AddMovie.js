import React, { useState, useRef } from "react";

import Button from "../UI/Button";
import validator from "validator";
import classes from "./AddMovie.module.css";

const AddMovie = (props) => {
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateTextRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const titleInput = titleRef.current.value;
    const openingTextInput = openingTextRef.current.value;
    const releaseDateInput = releaseDateTextRef.current.value;

    if (titleInput.trim().length === 0) {
      setTitleError(true);
      return;
    } else setTitleError(false);

    if (openingTextInput.trim().length < 10) {
      setTextError(true);
      return;
    } else setTextError(false);

    if (!validator.isDate(releaseDateInput)) {
      setDateError(true);
      return;
    } else setDateError(false);

    const movie = {
      title: titleInput,
      openingText: openingTextInput,
      releaseDate: releaseDateInput,
    };

    props.onAddMovie(movie);

    event.target.reset();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={`${classes.control} ${titleError && classes.invalid}`}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
        {titleError && <small>Enter a valid title</small>}
      </div>
      <div className={`${classes.control} ${textError && classes.invalid}`}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
        {textError && (
          <small>
            Enter a valid text description (length must be at least 10
            character)
          </small>
        )}
      </div>
      <div className={`${classes.control} ${dateError && classes.invalid}`}>
        <label htmlFor="date">Release Date</label>
        <input type="date" id="date" ref={releaseDateTextRef} />
        {dateError && <small>Enter a valid date</small>}
      </div>
      <Button type="submit">Add Movie</Button>
    </form>
  );
};

export default AddMovie;
