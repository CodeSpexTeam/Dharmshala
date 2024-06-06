namespace dharmshalaAPI.Helper
{
    public class ImageHelper
    {
        public async Task<string> StoreImage(IFormFile image)
        {
            try
            {
                // Generate a unique filename
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                string uploadsPath = @"C:\Users\immuk\source\repos\Dharmshala\dharmshala\src\assets\UploadedImages";

                // Create a directory if it doesn't exist (adjust path as needed)
                if (!Directory.Exists(uploadsPath))
                    Directory.CreateDirectory(uploadsPath);

                // Save the image to the uploads folder
                string filePath = Path.Combine(uploadsPath, fileName);
                await using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Return the relative path to the image (adjust as needed)
                return fileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error storing image: " + ex.Message);
                return null;
            }

        }

    }
}
