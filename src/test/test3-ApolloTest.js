import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

function Test3() {
  const { loading, error, data } = useQuery(GET_HELLO);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    <div className="apolloTestMain" style={{width: '60%'}}>
      <h1>Hasztabarabeluzda</h1><br />
      <h5>To jest niesamowite, gdy jednym klawiszem możesz opatulić tekst VSC rządzi</h5>
      <div>
        <strong>Zalety GraphQL (Apollo) nad REST:</strong><br /><br />

        Jedno zapytanie, wiele odpowiedzi: W GraphQL można pobrać wiele zasobów za jednym zamachem, co może poprawić wydajność sieci.<br /><br />

        Precyzyjne dane: <i><strong>Klienty GraphQL</strong></i> mogą specyfikować dokładnie te dane, które chcą otrzymać, co może pomóc w ograniczeniu ilości przesyłanych danych.<br /><br />

        Silne typowanie: GraphQL używa silnego typowania, co może poprawić jakość kodu, pomagając zapobiec pewnym rodzajom błędów.<br /><br />

        Real-time data: GraphQL obsługuje subskrypcje, które umożliwiają aktualizację danych w czasie rzeczywistym.<br /><br />

        <strong>Zalety REST nad GraphQL (Apollo):</strong><br /><br />

        <i>Prostota:</i> REST jest prostszy w zrozumieniu i implementacji, zwłaszcza dla małych projektów.<br /><br />

        <i>Caching:</i> REST ma lepsze wsparcie dla cachowania na poziomie HTTP, co może poprawić wydajność.<br /><br />

        Wsparcie narzędzi i bibliotek: <div>Ponieważ</div> REST jest starszy, ma lepsze wsparcie w wielu narzędziach i bibliotekach.<br /><br />

        Kompatybilność: Praktycznie każda platforma i język mają wsparcie dla REST, podczas gdy GraphQL wymaga specjalnego klienta, takiego jak Apollo.<br /><br />
      </div>
      {/* <p>{`Message: ${data.hello}`}</p> */}
    </div>
  );
}

export default Test3;
