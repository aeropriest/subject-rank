import faker from "faker";
import { randomColor } from "./utils";

export default function makeData(count) {
  let data = [];
  let options = [];
  for (let i = 0; i < count; i++) {
    let row = {
      ID: faker.mersenne.rand(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      age: Math.floor(20 + Math.random() * 20),
      music: faker.music.genre(),
    };
    options.push({ label: row.music, backgroundColor: randomColor() });

    data.push(row);
  }
  let columns = [
    {
      id: "firstName",
      label: "First Name",
      accessor: "firstName",
      minWidth: 100,
      dataType: "text",
      options: [],
    },
    {
      id: "lastName",
      label: "Last Name",
      accessor: "lastName",
      minWidth: 100,
      dataType: "text",
      options: [],
    },
    {
      id: "age",
      label: "Age",
      accessor: "age",
      width: 80,
      dataType: "number",
      options: [],
    },
    {
      id: "email",
      label: "E-Mail",
      accessor: "email",
      width: 300,
      dataType: "text",
      options: [],
    },
    {
      id: "music",
      label: "Music Preference",
      accessor: "music",
      dataType: "select",
      width: 200,
      options: options,
    },
    {
      id: 999999,
      width: 20,
      label: "+",
      disableResizing: true,
      dataType: "null",
    },
  ];
  return {
    columns: [
      {
        id: "subject",
        label: "Subject",
        accessor: "subject",
        minWidth: 100,
        dataType: "text",
        options: [],
      },
      {
        id: "difficulty",
        label: "Difficulty",
        accessor: "difficulty",
        minWidth: 20,
        dataType: "text",
        options: [],
      },
      {
        id: "enjoyment",
        label: "Enjoyment",
        accessor: "enjoyment",
        minWidth: 20,
        dataType: "text",
        options: [],
      },
      {
        id: "workload",
        label: "Workload",
        accessor: "workload",
        minWidth: 20,
        dataType: "text",
        options: [],
      },
      {
        id: "score",
        label: "Score",
        accessor: "score",
        minWidth: 20,
        dataType: "text",
        options: [],
      },
    ],
    data: [
      {
        subject: "Business Management",
        difficulty: 3,
        enjoyment: 4,
        workload: 3,
        score: 3,
      },
      {
        name: "Economics",
        difficulty: 4,
        enjoyment: 4,
        workload: 3,
      },
      {
        name: "Geography",
        difficulty: 2,
        enjoyment: 3,
        workload: 2,
      },
      {
        name: "History",
        difficulty: 4,
        enjoyment: 3,
        workload: 4,
      },
      {
        name: "Philosophy",
        difficulty: 5,
        enjoyment: 4,
        workload: 5,
      },
    ],
    skipReset: false,
  };
}
