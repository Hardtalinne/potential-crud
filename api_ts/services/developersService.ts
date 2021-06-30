import DevelopersRepository from "../repository/developersRepository";

class developersServices {
  async get(query, page, perPage) {
    return await DevelopersRepository
      .find(query)
      .sort({ birthDate: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
  }

  async getCount() {
    return await DevelopersRepository.find({}).countDocuments();
  }

  async getById(_id) {
    return await DevelopersRepository.findById({ _id });
  }

  async create(developer) {
    return await DevelopersRepository.create(developer);
  }

  async update(_id, developer) {
    return await DevelopersRepository.findByIdAndUpdate(_id, developer);
  }

  async delete(_id) {
    return await DevelopersRepository.findByIdAndRemove({ _id });
  }
}

export default new developersServices();
