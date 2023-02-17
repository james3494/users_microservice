
module.exports = {
  makeUsersDb ({ makeDb }) {

    return Object.freeze({
      findByEmail,
      findById,
      filterByRegex,
      insert,
      remove,
      update
    });

    async function findById ({ _id }) {
      const db = await makeDb();
      const result = await db.collection('users').find({ _id });
      const found = await result.toArray();
      if (found.length === 0) {
        return null;
      }
      return found[0];
    }

    async function insert ({ _id, ...info }) {
      const db = await makeDb();
      const result = await db
        .collection('users')
        .insertOne({ _id, ...info });

      return result.ops[0];
    }
    async function update ({ _id, ...info }) {
      const db = await makeDb();
      const result = await db
        .collection('users')
        .updateOne({ _id }, { $set: { ...info } });
      return result.modifiedCount > 0 ? { ...info } : null;
    }

    async function remove ({ _id }) {
      const db = await makeDb();
      const result = await db.collection('users').deleteOne({ _id });
      return !!result.deletedCount;
    }

    async function findByEmail ({ email }) {
      const db = await makeDb();
      const result = await db.collection('users').find({ email });
      const found = await result.toArray();
      if (found.length === 0) {
        return null;
      }
      return found[0];
    }
    async function filterByRegex ({ ...fields }) {
      const db = await makeDb();
      const result = await db.collection('users').find({ ...fields });
      const found = await result.toArray();
      if (found.length === 0) {
        return null;
      }
      return found;
    }

  }
} ;
