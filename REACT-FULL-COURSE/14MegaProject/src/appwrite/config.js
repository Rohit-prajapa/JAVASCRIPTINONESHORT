import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  // Convert a TablesDB row into the format used by React components.
  formatPost(row) {
    if (!row) return null;

    return {
      ...row,
      featuredImage: row.imageUrl || "",
      status: row.published ? "active" : "inactive",
    };
  }

  // Create a post.
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const row = await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: ID.unique(),
        data: {
          title,
          content,
          imageUrl: featuredImage || "",
          published: status === "active",
          userId,
        },
      });

      return this.formatPost(row);
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      return false;
    }
  }

  // Update a post.
  async updatePost(id, { title, content, featuredImage, status }) {
    try {
      const data = {
        title,
        content,
        published: status === "active",
      };

      if (featuredImage !== undefined) {
        data.imageUrl = featuredImage;
      }

      const row = await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: id,
        data,
      });

      return this.formatPost(row);
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  // Delete a post.
  async deletePost(id) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: id,
      });

      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // Get a single post by its Appwrite row ID.
  async getPost(id) {
    try {
      const row = await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: id,
      });

      return this.formatPost(row);
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  // Get published posts.
  async getPosts(queries = [Query.equal("published", true)]) {
    try {
      const result = await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
      });

      const rows = (result.rows || []).map((row) => this.formatPost(row));

      return {
        ...result,
        rows,
        documents: rows,
      };
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // Upload a featured image to Appwrite Storage.
  async uploadFile(file) {
    if (!file) return false;

    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  // Delete an image from Appwrite Storage.
  async deleteFile(fileId) {
    if (!fileId) return false;

    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });

      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // Generate a preview URL for an Appwrite Storage file.
  getFilePreview(fileId) {
    if (!fileId) return null;

    const url = this.bucket.getFileView(conf.appwriteBucketId, fileId);

    console.log("Image URL:", url.toString());

    return url.toString();
  }
}

const appwriteService = new Service();

export default appwriteService;
