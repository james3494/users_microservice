
module.exports = {
  makeUsersDb ({ makeDb }) {

    return Object.freeze({
      findByEmail,
      findById,
      andStyleFilter,
      orStyleFilter,
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
    // this is an 'AND' style search. It can take regex in the filters
    async function andStyleFilter ({ ...fields }) {
      const db = await makeDb();

      const result = await db.collection('users').find({ ...fields });
      const found = await result.toArray();
      return found;
    }
    // this is an 'OR' style search. It can take regex in the filters
    async function orStyleFilter ({ ...fields }) {
      const db = await makeDb();
      let queryArray=[];
      Object.entries(fields).forEach(([key, value]) => {
        queryArray.push({ [key]: value });
      })
      const result = await db.collection('users').find({ $or: queryArray });
      const found = await result.toArray();
      return found;
    }

  }
} ;
