// utils/normalizeVideos.ts
export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

export function normalizeVideos(data: any): VideoItem[] {
  if (data && Array.isArray(data.videos)) {
    return data.videos.map((v: any) => ({
      id: v.id || v._id || String(Math.random()),
      title: v.title || v.name || "Untitled",
      thumbnail: v.thumbnail || v.thumb || "",
      videoUrl: v.videoUrl || v.url || ""
    }));
  }

  if (Array.isArray(data)) {
    return data.map((v: any) => ({
      id: v.id || v._id || String(Math.random()),
      title: v.title || v.name || "Untitled",
      thumbnail: v.thumbnail || v.thumb || "",
      videoUrl: v.videoUrl || v.url || ""
    }));
  }

  if (data && typeof data === "object") {
    return [{
      id: data.id || data._id || String(Math.random()),
      title: data.title || data.name || "Untitled",
      thumbnail: data.thumbnail || data.thumb || "",
      videoUrl: data.videoUrl || data.url || ""
    }];
  }

  return [];
}
