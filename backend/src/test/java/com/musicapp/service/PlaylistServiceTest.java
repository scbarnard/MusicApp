package com.musicapp.service;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.musicapp.model.Playlist;
import com.musicapp.model.Song;
import com.musicapp.model.User;
import com.musicapp.repository.PlaylistRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PlaylistServiceTest {
    private PlaylistRepository playlistRepository = Mockito.mock(PlaylistRepository.class);

    private PlaylistService playlistService = new PlaylistService(playlistRepository);

    @Test
    public void createPlaylistSuccessTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()
            )).thenReturn(
                playlist);


        boolean result = playlistService.createPlaylist(playlist);

        Assert.assertFalse(result);
    }

    @Test
    public void createPlaylistFailureTest(){
        Playlist playlist = new Playlist();

        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()
            )).thenReturn(
                null);

        boolean result = playlistService.createPlaylist(playlist);

        Assert.assertTrue(result);
    }

    @Test
    public void readPlaylistTest(){
        Playlist playlist = new Playlist();
        playlist.setPlaylistName("Playlist Name");

        List<Playlist> playlists = new ArrayList<>();
        playlists.add(playlist);

        Mockito.when(playlistRepository.findByUsername("username")).thenReturn(playlists);

        List<Playlist> foundPlaylists = playlistService.readPlaylist("username");
        Assert.assertEquals("Playlist Name", foundPlaylists.get(0).getPlaylistName());
    }

    @Test
    public void readPlaylistSongsByPlaylistIdSuccessTest(){
        String playlistId = "good id";
        Playlist playlist = new Playlist();
        List<Song> songs = new ArrayList<>();

        playlist.setSongs(songs);

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(java.util.Optional.of(playlist));

        List<Song> foundSongs = playlistService.readPlaylistSongsByPlaylistId(playlistId);
        Assert.assertEquals(songs,foundSongs);
    }

    @Test
    public void readPlaylistSongsByPlaylistIdFailureTest(){
        String playlistId = "bad Id";

        Mockito.when(playlistRepository.findById(playlistId)).thenReturn(Optional.ofNullable(null));
        List<Song> foundSongs = playlistService.readPlaylistSongsByPlaylistId(playlistId);
        Assert.assertNull(foundSongs);
    }

    @Test
    public void updatePlaylistSuccessTest(){
        Playlist playlist = new Playlist();
        playlist.setPlaylistName("pName");
        playlist.setUsername("uName");
        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()))
            .thenReturn(playlist);

        Playlist foundPlaylist = playlistService.updatePlaylist(playlist);

        Assert.assertEquals(playlist, foundPlaylist);

    }

    @Test
    public void updatePlaylistFailureTest(){
        Playlist playlist = new Playlist();
        playlist.setPlaylistName("pName");
        playlist.setUsername("uName");
        Mockito.when(playlistRepository.findByUsernameAndPlaylistName(
                playlist.getUsername(),
                playlist.getPlaylistName()))
                .thenReturn(null);

        Playlist foundPlaylist = playlistService.updatePlaylist(playlist);

        Assert.assertNull(foundPlaylist);
    }

    @Test
    public void deletePlaylistTest(){
        Playlist playlist = new Playlist();

        playlistService.deletePlaylist(playlist);
    }
}
