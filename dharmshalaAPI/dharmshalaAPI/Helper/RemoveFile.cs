namespace dharmshalaAPI.Helper
{
    public class RemoveFile
    {

        public string RemoveFileFromFolder(string filePath)
        {

            try
            {
                // Check if the file exists before attempting to delete it
                if (File.Exists(filePath))
                {
                    // Delete the file
                    File.Delete(filePath);
                    return "File deleted successfully !";
                }
                else
                {
                    return "File does not exist !";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
