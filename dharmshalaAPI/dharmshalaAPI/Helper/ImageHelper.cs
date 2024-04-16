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

                // Create a directory if it doesn't exist (adjust path as needed)
                string uploadsPath = @"D:\CodespexTeam Project\Dharmshala\Dharmshala\dharmshala\src\assets";


                // Save the image to the uploads folder
                string filePath = Path.Combine(uploadsPath, fileName);
                await using (FileStream stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Return the relative path to the image (adjust as needed)
                return Path.Combine("assets", fileName);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error storing image: " + ex.Message);
                return null;
            }

        }

    }
}
