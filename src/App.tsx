import "./styles.css";
import { Book, BookInformation, Review, User } from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";

const toBookInformation = (
  book: Book,
  users: User[],
  reviews: Review[]
): BookInformation => {
  const author = users.find((user) => user.id === book.authorId);
  const bookReviews = book.reviewIds.map((reviewId) => {
    const review = reviews.find((reviewElem) => reviewElem.id === reviewId);
    const user = users.find((userElem) => userElem.id === review?.userId);
    return {
      id: review?.id || "",
      text: review?.text || "",
      user: user || { id: "", name: "Неизвестный пользователь" },
    };
  });

  return {
    id: book.id,
    name: book.name || "Книга без названия",
    author: author || { id: "", name: "Неизвестный автор" },
    reviews: bookReviews,
    description: book.description,
  };
};

const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedBooks, fetchedUsers, fetchedReviews] = await Promise.all([
        getBooks(),
        getUsers(),
        getReviews(),
      ]);
      setBooks(fetchedBooks);
      setUsers(fetchedUsers);
      setReviews(fetchedReviews);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => (
          <Card key={b.id} book={toBookInformation(b, users, reviews)} />
        ))}
    </div>
  );
};

export default App;
