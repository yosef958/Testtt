const apiKey = "AIzaSyCxrMsdKZnMBMFTEou17JBCtbyGwHdaBFY"; 
const cx = "<script async src="https://cse.google.com/cse.js?cx=42207e870802b4030">
</script>
<div class="gcse-search"></div>"; 
const inp = document.getElementById("inp");
const images = document.querySelector(".images");

let startIndex = 1; 

const getImage = async () => {
  const query = inp.value.trim();
  if (!query) return;

  try {
    const res = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=image&num=3&start=${startIndex}`);
    const data = await res.json();

    images.innerHTML = "";

    if (!data.items) {
      console.error("No items found");
      return;
    }

    
    const seenLinks = new Set();
    const uniqueItems = [];

    for (const item of data.items) {
      if(item.link && !seenLinks.has(item.link)){
        seenLinks.add(item.link);
        uniqueItems.push(item);
      }
      if(uniqueItems.length >= 3) break; 
    }

    uniqueItems.forEach(item => {
      const container = document.createElement("div");

     
      if(item.link.match(/\.(mp4|webm|ogg)$/i)) {
        const video = document.createElement("video");
        video.src = item.link;
        video.controls = true;
        video.width = 200;
        video.height = 200;
        container.append(video);
      } else { 
        const img = document.createElement("img");
        img.src = item.link;
        container.append(img);
      }

      images.append(container);
    });

    startIndex += 3;
    if(startIndex > 90) startIndex = 1;

  } catch (err) {
    console.error(err.message);
  }
};
 startIndex += 3;
    if(startIndex > 90) startIndex = 1; 

  } catch (err) {
    console.error(err.message);
  }
};
