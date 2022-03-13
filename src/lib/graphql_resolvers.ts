import { Data } from ".";

import type { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    courses() {
      return Data.courses();
    },

    course(_root, args: { id: string }) {
      return Data.course(args.id);
    },

    students() {
      return Data.students();
    },

    student(_root, { id }) {
      return Data.student(id);
    },

    searchItems(_root, { query }) {
      return Data.searchItems(query);
    },
  },
  Mutation: {
    createCourse(_root, { input }) {
      return Data.addCourse(input);
    },

    editCourse(_root, { _id, input }) {
      return Data.editCourse(_id, input);
    },

    deleteCourse(_root, { _id }) {
      return Data.deleteCourse(_id);
    },

    createPerson(_root, { input }) {
      return Data.createPerson(input);
    },

    editPerson(_root, { _id, input }) {
      return Data.editPerson(_id, input);
    },

    deletePerson(_root, { _id }) {
      return Data.deleteStudent(_id);
    },

    addPeople(_root, { courseID, personID }) {
      return Data.addPeople(courseID, personID);
    },
  },

  Course: {
    people({ people }) {
      return Data.people(people);
    },
  },

  Person: {
    __resolveType(person: { phone: boolean }) {
      return person.phone ? "Monitor" : "Student";
    },
  },

  GlobalSearch: {
    __resolveType(item: { title: boolean; phone: boolean }) {
      if (item.title) {
        return "Course";
      }

      if (item.phone) {
        return "Monitor";
      }

      return "Student";
    },
  },
};
