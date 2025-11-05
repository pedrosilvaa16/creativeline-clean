"use client";

import Image from "next/image";
import { toast } from "react-toastify";

const arrowRightTwo = "/assets/img/icon/arrow-right-two.png";

interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const NewsletterV2 = () => {
  const handleForm: FormEventHandler = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    form.reset();
    toast.success("Thanks for your email!");
  };

  return (
    <form className="newsletter style-two" onSubmit={handleForm}>
      <input
        type="email"
        placeholder="Your Email"
        className="form-control"
        name="email"
        autoComplete="off"
        required
      />
      <button type="submit" className="submit-btn">
        <Image
          src={arrowRightTwo}
          alt="Arrow icon"
          width={24}
          height={24}
          priority
        />
      </button>
    </form>
  );
};

export default NewsletterV2;
