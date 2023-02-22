import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
} from 'firebase/firestore'

type CharcoalDocument<T> = T & {
  _collection: CollectionReference<T>
  _doc: DocumentReference<T>
  save: () => Promise<boolean>
  data: () => Promise<T>
  update: () => Promise<void>
}

interface CharcoalModel<T> {
  new (params: T): CharcoalDocument<T>
}

export function getCollection<T>(
  firestore: Firestore,
  name: string
): CharcoalModel<T> {
  const reservedKeys = ['_collection', '_doc', 'save']

  async function save(this: CharcoalDocument<T>) {
    const fields = Object.keys(this).filter(x => reservedKeys.includes(x))

    try {
      await setDoc(this._doc, Object.fromEntries(fields.map(x => [x, this[x]])))
      return true
    } catch {
      return false
    }
  }

  async function update(this: CharcoalDocument<T>, f: (params: T) => T) {
    const doc = (await getDoc(this._doc)).data()
    await setDoc(this._doc, { ...f(doc) })
  }

  async function data(this: CharcoalDocument<T>) {
    const snapshot = await getDoc(this._doc)
    return snapshot.data()
  }

  function create(params: T) {
    this._collection = collection(firestore, name) as CollectionReference<T>
    this._doc = doc(this._collection)
    this.save = save
    this.data = data
    this.update = update

    for (const k in params) {
      this[k] = params[k]
    }
  }

  return create as unknown as CharcoalModel<T>
}
